import { useState } from "react";
import { Form, Button, Dropdown} from "react-bootstrap"

export default function TeamDirectorySearchArea ({refreshEffect, setLoading, setResult}){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [category, setCategory] =useState('');

    const submitSearchRequest = () =>{
        setLoading(true);
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/users/search`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                firstName: firstName.replace(/\\/g, "\\\\"),
                lastName: lastName.replace(/\\/g, "\\\\"),
                department: category.toLowerCase()
            })
        })
        .then(res => res.json())
        .then(data => {
            const sortedData = data.sort((a, b) => (a.department > b.department) ? 1 : -1);
            setResult(sortedData);
            setLoading(false);
        })
    }
    const reset = () =>{
        setFirstName(''); 
        setLastName('')
        setCategory('');
        refreshEffect();
    }

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
      };
    return(
        <>
            <div className="d-flex">
            <Form.Control
            style={{borderRadius:'8px'}}
            type="text"
            placeholder="First name..."
            onChange={(e) => setFirstName(e.target.value)}
            className='custom-search-input'
            value={firstName} 
            />
            
            <Form.Control
            style={{borderRadius:'8px'}}
            type="text"
            placeholder="Last name..."
            onChange={(e) => setLastName(e.target.value)}
            className='custom-search-input'
            value={lastName} 
            />
            
            <div className="d-flex align-items-center">
                <Dropdown onSelect={handleCategorySelect} className="ml-1" >
                <Dropdown.Toggle variant="secondary" id="categoryDropdown" size='sm' style={{minWidth:'130px'}}>
                {category ? category : 'Company-wide'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item eventKey="">Company-wide</Dropdown.Item>
                <Dropdown.Item eventKey="Executive">Executive</Dropdown.Item>
                <Dropdown.Item eventKey="Legal&Finance">Legal & Finance</Dropdown.Item>
                <Dropdown.Item eventKey="IT">IT</Dropdown.Item>
                <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
                <Dropdown.Item eventKey="Operations">Operations</Dropdown.Item>
                <Dropdown.Item eventKey="Marketing">Marketing</Dropdown.Item>
                <Dropdown.Item eventKey="Shows&Touring">Shows & Touring</Dropdown.Item>
                <Dropdown.Item eventKey="ArtistDevelopment">Artist Development</Dropdown.Item>
                {/* Add more categories as needed */}
                </Dropdown.Menu>
                </Dropdown>
                <Button className="d-flex ml-1 button-bg" style={{boxShadow:'none', height:'30px'}} size='sm' onClick={submitSearchRequest}>Search</Button>
                <Button className="d-flex ml-1 button-cancel"  style={{boxShadow:'none', height:'30px'}} size='sm' onClick={reset}>Reset</Button>
            </div>
            
        </div>
        </>
    )
}