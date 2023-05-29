import React, { useState } from "react";
import { Container, Grid, Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { task2Validation } from "../schemas";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


let initialValues = {
    num: ''
}
function getFibonacciSeries(input){
    let allData = [];
    let a = -1;
    let b = 1; 
    let c = 0; 
    while (c <= input) {
        allData.push(c)
        a = b;
        b = c; 
        c = a+b
        
    }
    return allData
}





const Task3 = () => {
    const navigate = useNavigate();
    let [output, setOutput] = useState([])

    
    let  getFibonacci = (values)=>{
        let result = getFibonacciSeries(values.num);
        setOutput(result);
    }
    let {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: task2Validation,
        onSubmit : (values)=>{
            getFibonacci(values)
        }
      })
    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} lg={12} md={12}>
                    <h2>3. Write a program to print the Fibonacci series up to the number which is
                        lesser than the given input</h2>
                    <pre>
                        <p>User input: 120

                        </p>
                        Program output:
                        0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
                    </pre>
                    <ButtonGroup variant="contained" aria-label="text button group">
                        <Button type="button" onClick={() => navigate("/task1")} color="primary">Task1</Button>
                        <Button type="button" onClick={() => navigate("/task2")} color="primary">Task2</Button>
                    </ButtonGroup>
                </Grid>

                <Grid item xs={12} lg={12} md={12}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={errors.num && touched.num ? true : false}
                            helperText={touched.num && errors.num ? errors.num : ''}
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
                    <li style={{ listStyleType: "none" }}>{output.join(',')}</li>
                    </ul>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Task3;



