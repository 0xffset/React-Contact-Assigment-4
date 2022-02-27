/* eslint-disable react-hooks/rules-of-hooks */
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
  modalTitle: string;
  modalContent: string;
}

class AddContact extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      openModal: false,
      modalTitle: "",
      modalContent: "",
      error: [],
    };
  }
  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };

  onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      this.state.firstname.length === 0 ||
      this.state.lastname.length === 0 ||
      this.state.phone.length === 0
    ) {
      this.setState({
        modalTitle: "An error has been occur! 😲",
        modalContent: "Please, fill out all inputs",
        openModal: true,
      });
    } else {
      const data = {
        nombre: this.state.firstname,
        apellido: this.state.lastname,
        telefono: this.state.phone,
      };
      fetch("https://www.raydelto.org/agenda.php", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          this.setState({
            modalTitle: "The contact was saved! 👌",
            modalContent: "The contact has been saved succesfully!",
            openModal: true,
            firstname: "",
            lastname: "",
            phone: ""
          });
        } else {
            this.setState({
                modalTitle: "Ooop! Error  😭",
                modalContent: "An error has been occur, please try again.",
                openModal: true,
                firstname: "",
                lastname: "",
                phone: ""
              });
        }
      });
    }
  };
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
              <h2 id="unstyled-modal-title">{this.state.modalTitle}</h2>
              <p id="unstyled-modal-description">{this.state.modalContent}</p>
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
              onChange={(e) => this.setState({ firstname: e.target.value })}
              name="firstname"
              value={this.state.firstname}
              label="First Name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => this.setState({ lastname: e.target.value })}
              value={this.state.lastname}
              name="lastname"
              label="Last Name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => this.setState({ phone: e.target.value })}
              value={this.state.phone}
              name="phone"
              label="Phone"
              variant="outlined"
            />
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
