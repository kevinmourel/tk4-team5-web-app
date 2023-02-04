import { useEffect, useState } from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import Edit from "../components/Edit";

function Home (){


    const [isRefresh, setIsRefresh] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [payload, setPayload] = useState({})

    const setRefresh = (status) => {
        setIsRefresh(status)
    }


    return(
        <> 
        <Form setRefresh={setRefresh} showModal={showModal} setShowModal={setShowModal} />
        <Edit setRefresh={setRefresh} showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} payload={payload}/>
        <Table setRefresh={setRefresh} isRefresh={isRefresh} setShowModal={setShowModal} setShowModalEdit={setShowModalEdit} setPayload={setPayload}/>
        </>
    )
}

export default Home;