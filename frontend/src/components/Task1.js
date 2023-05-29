import React from "react";
import { Container, InputAdornment, TextField, Grid, Paper, Typography, Button,ButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { encode} from 'js-base64';
 
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const style2 = {
    p: 2,
    margin: 'auto',
    maxWidth: 500,
    flexGrow: 1,
    backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
}

const Task1 = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    const onChange = (value) => {
        var config = {
            method: 'GET',
            url: `https://api.jikan.moe/v4/characters?page=0&limit=15&q=&order_by=favorites&q=${value}sort=desc`,
        };
        axios(config)
            .then(function (response) {
                if (response.status) {
                    setUserList(response.data.data)
                }
                else {
                    toast.error(response.data.statusText)
                }
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            });
    }

    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            const context = this;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        };
    }
    const debounceOnChange = React.useCallback(debounce(onChange, 400), []);
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        debounceOnChange(event.target.value)
    };
    const editUser = (id) => {
        navigate('/editUser/' + encode(id))
    }
    
    const getAllUsers = async () => {    
        var config = {
            method: 'GET',
            url: `https://api.jikan.moe/v4/characters?page=1&limit=15&q=&order_by=favorites&sort=desc`
        };
        axios(config)
            .then(function (response) {
                
                if (response.status) {
                    setUserList(response.data.data)
                }
                else {
                    toast.error(response.data.statusText)
                }
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            });
    }
    useEffect(() => {
        getAllUsers();
    }, [])
    
    
    
    console.log({userList});
    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6} lg={10} md={10}>
                    
                    <TextField
                        id="search"
                        type="search"
                        size="small"
                        label="Search"
                        value={searchTerm}
                        onChange={handleChange}
                        sx={{ width: 600 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6} lg={2} md={2}>
                   
                </Grid>
                {
                    !!userList && userList.length ? userList.map((row, index) => {
                        let image = row.images.jpg.image_url;
                        return (
                            <Grid item xs={4} key={index}>
                                <Paper sx={style2} >
                                    <Grid container spacing={2}>
                                        <Grid item display="flex" justifyContent="center" alignItems="center">
                                            <Link>
                                                <Img alt="complex" height={100} width={100} src={image} />
                                            </Link>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1" component="div">
                                                        {row.name}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        {row.name_kanji}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        ID: {row.id}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })
                        :
                        <>
                        <Typography  sx={{ color: 'red' }} variant="body2">
                                                No Data found  !          
                        </Typography>
                        </>
                }



                            </Grid>
                        </Container>
    );
}

export default Task1;



