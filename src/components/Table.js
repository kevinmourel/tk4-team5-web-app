
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


const Table = ({isRefresh, setRefresh, setShowModal, setShowModalEdit, setPayload}) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isRefresh) {
        setIsLoading(true)
        fetch('http://localhost:8000/data')
            .then((res) => res.json())
            .then((res) => {
                setRefresh(false)
                setIsLoading(false)
                setProducts(res)
            })
    }}, [isRefresh, setRefresh]);

    const editData = (id) =>{
        setIsLoading(true)
        fetch(`http://localhost:8000/data?id=${id}`)
            .then((res) => res.json())
            .then((res) => {
                setPayload(res[0])
                setIsLoading(false)
                setShowModalEdit(true)
            })
    }
    
    const deleteData = (id) => {
        setIsLoading(true)
        fetch("http://localhost:8000/data/" + id, {
          method: "DELETE",
        }).then(() => {
          alert("Data Deleted")
          setIsLoading(false)
          setRefresh(true);
        });
      };

    return (
        <div className=" container p-5">
            
            <h1 className='mb-3'>Tabel Data</h1>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add Data</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" >ID</th>
                        <th scope="col" >NIM</th>
                        <th scope="col" >Nama</th>
                        <th scope="col" >Alamat</th>
                        <th scope="col" >Jenis Kelamin</th>
                        <th scope="col" >Hobi</th>
                        <th scope="col" >Komentar</th>
                        <th scope="col" >Lokasi</th>
                        <th scope="col" >Action</th>

                    </tr>
                </thead>
                <tbody>
                  
                    { isLoading &&

                        <td style={{position: 'relative', 
                            left: '50%',
                            transform: 'translateX(-50%)'}}>
                        <Spinner animation="border" />
                        </td>
                    }

                    {products.map((item, i) => {
                        return <tr>
                            <td>{i + 1}</td>
                            <td>{item.nim}</td>
                            <td>{item.nama}</td>
                            <td>{item.alamat}</td>
                            <td>{item.kelamin}</td>
                            <td>{item.hobi}</td>
                            <td>{item.komentar}</td>
                            <td>{item.location}</td>
                            <td>
                                <button className='btn btn-success' onClick={() => editData(item.id)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => deleteData(item.id)}>Delete</button>
                            </td>
                            
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Table