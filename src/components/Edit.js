import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

const Edit = ({showModalEdit, setShowModalEdit, setRefresh, payload}) => {

    const [data, setData] = useState({})
    const {nim, nama, alamat, kelamin, hobi, komentar} = data;

    useEffect(() =>{
        if(Object.keys(payload).length !== 0){
            setData(payload)
        }
    }, [payload])

    const onValueChange = (e) =>
    {
        setData({...data, [e.target.name]: e.target.value});
       
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if( !data.nama ){
            
            alert("File belum dimasukkan dan semua inputan belum terisi")
            return
        }

        fetch("http://localhost:8000/data/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            setRefresh(true)
			alert("Data Edited")
            setShowModalEdit(false)
        });
        
    }

    const onReset = () => {
        setData({
            nim: "",
            nama: "",
            alamat : "",
            kelamin: "",
            hobi: "",
            komentar: ""
        })
    }

    return (
        <>
            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form >
                    <div className="form-group mt-3">
                    <label className='mb-2'> NIM</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder="NIM"
                            onChange={(e) => onValueChange(e)}
                            name="nim" 
                            value={nim} />
                    </div>
                    <div className="form-group mt-3">
                    <label className='mb-2'> Nama</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Nama"
                            onChange={(e) => onValueChange(e)}
                            name="nama" 
                            value={nama} />
                    </div>
                    <div className="form-group mt-3">
                    <label className='mb-2'> Alamat</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Alamat"
                            onChange={(e) => onValueChange(e)}
                            name="alamat" 
                            value={alamat} />
                    </div>
                    <div className="form-group mt-3">
                        <label className='mb-2'> Hobi</label>
                        <select value={hobi} className="form-control" name="hobi" onChange={(e) => onValueChange(e)}>
                            <option value='Membaca'>Membaca</option>
                            <option value='Belajar'>Belajar</option>
                            <option value='Olahraga'>Olahraga</option>
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label className='mb-2'> Komentar</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Komentar"
                            onChange={(e) => onValueChange(e)}
                            name="komentar" 
                            value={komentar} />
                    </div>

                    <button type="button" className="btn btn-warning mt-3 " onClick={onReset}>Reset</button>
                    <button type="button" className="btn btn-primary mt-3 mx-3" onClick={onSubmit}>Submit</button>
                </form>
                </Modal.Body>
            </Modal>
        </>       
    )
}

export default Edit