import React, { useState } from "react";
import { Container, Grid, Button,ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { task2Validation } from "../schemas";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


let initialValues = {
    num: ''
  }


function printShape(input) {
    let allData = [];
    let length = ((Number(input) - 1) * 2) + 1
    var k = 0;
    for (let i = 1; i <= length; i++) {
        var row = [];
        let m = 49;
        i <= input ? k++ : k--;
        for (let j = 1; j <= length; j++) {

            if (j >= (input + 1) - k && j <= (input - 1) + k) {
                row.push(String.fromCharCode(m) + '\u00A0')
                if (j < input) {
                    m += 2
                }
                else {
                    m++
                }
                if (j == input) {
                    m = 65;
                }
            }
            else {
                row.push('\u00A0\u00A0')
            }
        }
        allData.push(row)
    }
    return allData
}




const Task2 = () => {
    const navigate = useNavigate();
    let [output,setOutput] = useState([])
    
    let getShape = (values) => {
        // console.log(values)
        let result = printShape(values.num);
        setOutput(result);
    }
    let { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: task2Validation,
        onSubmit: (values) => {
            getShape(values)
        }
    })
    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} lg={12} md={12}>
                    <h2>2. Write a program to print the following pattern </h2>
                    <pre>
                    <p>Sample Input</p>
                    Please enter your lucky number: 5
                    </pre>
                    <ButtonGroup variant="contained" aria-label="text button group">
                            <Button type="button" onClick={()=> navigate("/task1") } color="primary">Task1</Button>
                            <Button type="button" onClick={()=> navigate("/task3") } color="primary">Task3</Button>
                        </ButtonGroup>
                </Grid>
                
                <Grid item xs={12} lg={12} md={12}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={errors.num && touched.num?true:false}
                            helperText={touched.num && errors.num?errors.num:''}
                            size="small"
                            margin="normal"
                            required
                            fullWidth
                            id="num"
                            label="lucky  number"
                            name="num"
                            autoComplete="num"
                            autoFocus
                            value={values.num}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Button variant="contained" type="submit" color="primary">GET</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                <ul >
                    {
                        output.map((row,index)=>{
                            return(
                                <li key={index} style={{listStyleType: "none"}}>{row}</li>     
                            )
                        })
                    }  
                </ul>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Task2;



