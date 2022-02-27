import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { styled } from "@mui/system";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

interface IProps {}

interface IState {
  firstname: string;
  lastname: string;
  phone: string;
  error: [];
  openModal: boolean;
}
class AddContact extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      openModal: false,
      error: [],
    };
  }
  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };
  //   const PostData = async (): Promise<void> => {
  //     const reponse  = await fetch("https://www.raydelto.org/agenda.php", {
  //         method: 'POST',
  //         mode: 'cors',
  //         headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify(data)
  //     })
  //   }
  onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      this.state.firstname.length === 0 ||
      this.state.lastname.length === 0 ||
      this.state.phone.length === 0
    ) {
      this.setState({
        openModal: true,
      });
    } else {
      const data = {
        nombre: this.state.firstname,
        apellido: this.state.lastname,
        telefono: this.state.phone,
      };
      console.log(JSON.stringify(data));
      fetch("http://www.raydelto.org/agenda.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          alert("Good!");
        } else {
          alert("Not Good");
        }
      });
    }
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    this.setState({
      firstname: e.target.value,
      lastname: e.target.value,
      phone: e.target.value,
    });
  render(): React.ReactNode {
    return (
      <>
        <div>
          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            BackdropComponent={Backdrop}
          >
            <Box sx={style}>
              <h2 id="unstyled-modal-title">An error has been occur! 😲</h2>
              <p id="unstyled-modal-description">Please, fill out all inputs</p>
            </Box>
          </StyledModal>
        </div>

        <FormControl>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "15ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={this.onChange}
              name="firstname"
              label="First Name"
              variant="outlined"
            />
            <TextField name="lastname" label="Last Name" variant="outlined" />
            <TextField name="phone" label="Phone" variant="outlined" />
            <Button onClick={this.onSubmit} variant="outlined" size="large">
              Submit
            </Button>
          </Box>
        </FormControl>
      </>
    );
  }
}

export default AddContact;
