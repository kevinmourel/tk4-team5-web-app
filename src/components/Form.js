import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

const Form = ({showModal, setShowModal, setRefresh}) => {

    const initialValue = {
        nim: "",
        nama: "",
        alamat : "",
        kelamin: "",
        hobi: "",
        komentar: "",
        location: ""
    }

    const [data, setData] = useState(initialValue)
    const {nim, nama, alamat, kelamin, hobi, komentar, location} = data;

    const onValueChange = (e) =>
    {
        setData({...data, [e.target.name]: e.target.value});
       
    }

    const getLocation= () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const value = position.coords.latitude + ', ' + position.coords.longitude
                setData({...data, location: value});
            });
        } else { 
          alert("Geolocation is not supported by this browser.");
        }
      }

    const onSubmit = (e) => {
        e.preventDefault();
        
        getLocation()

        if( !data.nama){
            
            alert("File belum dimasukkan dan semua inputan belum terisi")
            return
        }

        fetch('http://localhost:8000/data', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            setRefresh(true)
			alert("Data Added")
            setShowModal(false)
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Add Data</Modal.Title>
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
                        <label className='mb-2'> Jenis Kelamin</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" 
                                name="kelamin" 
                                onChange={(e) => onValueChange(e)}     
                                value="Laki - Laki" />
                            <label className="form-check-label" >
                                Laki - laki
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio"
                                name="kelamin" 
                                onChange={(e) => onValueChange(e)}     
                                value="Perempuan" />
                            <label className="form-check-label" for="exampleRadios2">
                                Perempuan
                            </label>
                        </div>
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

export default Form