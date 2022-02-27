import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 17
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

interface IProps {

}
interface IState {
    data: [],
    submit: []
}

class Contact extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props)
        this.state = {
            data: [],
            submit: []
        }
    }

    componentDidMount() {
       fetch("https://www.raydelto.org/agenda.php")
          .then(res => res.json())
          .then(res => this.setState({
              data: res
          }))
          .catch(error => alert(error))
       
    }
    componentDidUpdate() {
        console.log(this.state.data)
    }
    render() {
 
        return (
            <React.Fragment>
            <CssBaseline />

            <Container >
            <FormControl>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '15ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="First Name"  variant="outlined"   />
      <TextField label="Last Name" variant="outlined"    />
      <TextField
        label="Phone"
        variant="outlined" 

      />
      <Button variant="outlined" size="large">Submit</Button>
    </Box>
    </FormControl>
              <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
              >
                 <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell >Last Name</StyledTableCell>
                <StyledTableCell >Phone</StyledTableCell>
         
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row :any, key :number) => (
               
                <StyledTableRow key={key}>
                  <StyledTableCell component="th" scope="row">
                    {row.nombre}
                  </StyledTableCell>
                  <StyledTableCell >{row.apellido}</StyledTableCell>
                  <StyledTableCell >{row.telefono}</StyledTableCell>
             
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
              </Grid>
            </Container>
          </React.Fragment>
        )
    }
}

export default Contact