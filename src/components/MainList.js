import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  getRecords,
  addToRecords,
  removeFromRecords,
} from "../store/actions/recordsActions";
import ModalWindow from "./Modal/Modal";
import ModalCheckingDelete from "./Modal/ModalCheckingDelete";
import ModalChooseRecord from "./Modal/ModalChooseRecord";
import styles from "./Mainlist.module.css";
import { fetchUser } from "../store/reducers/userReducer";
import { useSnackbar } from "notistack";
import Spinner from "./Spinner/Spinner";

const MainList = (props) => {
  props.getRecords();
  const records = props.records;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [chooseRecord, setChooseRecord] = useState(false);
  const [userData, setUserData] = useState();
  const [spinner, setSpinner] = useState(false);

  const addRecord = (isSaved, record) => {
    setOpen(true);
    if (isSaved === true) {
      setOpen(false);
      props.addToRecords(record);
    }
    if (isSaved === false) setOpen(false);
  };

  const deleteRecord = (isDeleted) => {
    if (idDelete !== null) setOpenDelete(true);
    else {
      setChooseRecord(true);
    }
    if (isDeleted === true) {
      setOpenDelete(false);
      props.removeFromRecords(idDelete);
      setIdDelete(null);
    }
    if (isDeleted === false) setOpenDelete(false);
  };

  const closeInfoWindow = (isUnderstood) => {
    if (isUnderstood === true) {
      setChooseRecord(false);
    }
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (userData !== undefined) {
      setSpinner(false);
      if (props.user.errors) {
        const message = `Id:${props.user.errors[0].message}`;
        enqueueSnackbar(message);
      } else {
        const message = `Id:${props.user.data.user.id},Username:${props.user.data.user.username},E-mail:${props.user.data.user.email},
        Lat:${props.user.data.user.address.geo.lat},Lng:${props.user.data.user.address.geo.lng}`;
        enqueueSnackbar(message);
      }
    }
  }, [props.user]);

  const handleClick = () => {
    setSpinner(true);
    dispatch(fetchUser());
    setUserData(props.user);
  };

  if (records != null) {
    const recordItems = records.map((record) => (
      <li
        key={record.id}
        className={styles.record}
        style={{ color: record.id === idDelete ? "red" : "black" }}
        onClick={(e) => {
          setIdDelete(record.id);
        }}
      >
        {record.text}
      </li>
    ));
    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={addRecord}>
            Добавить
          </button>
          <button className={styles.button} onClick={deleteRecord}>
            Удалить
          </button>
          {!spinner && (
            <button className={styles.button} onClick={handleClick}>
              Test GraphQL
            </button>
          )}
          {spinner && (
            <button className={styles.button} disabled>
              Test GraphQL
            </button>
          )}
          {open && <ModalWindow addRecord={addRecord} />}
          {openDelete && <ModalCheckingDelete deleteRecord={deleteRecord} />}
          {chooseRecord && (
            <ModalChooseRecord closeInfoWindow={closeInfoWindow} />
          )}
        </div>
        <ul>{recordItems}</ul>
        {spinner && <Spinner />}
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => ({
  records: state.recordsReducer.records,
  user: state.userReducer.user,
});

export default connect(mapStateToProps, {
  getRecords,
  addToRecords,
  removeFromRecords,
  fetchUser,
})(MainList);
