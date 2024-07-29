import React from "react";
import { useState } from "react";
import { Section } from "./Section";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Player } from "@lottiefiles/react-lottie-player";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
} from "@mui/joy";
import Send from "@mui/icons-material/Send";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PhoneIcon from "@mui/icons-material/Phone";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const ContactSection = () => {
  const [isSendButtonLoading, setIsSendButtonLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Section>
        <h2 className="text-5xl md:text-6xl font-[K2D] leading-snug mt-8 md:mt-0 text-gray-200">
          Contact us!
        </h2>
        <div className="mt-8 p-8 rounded-md bg-white w-5/12 max-w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSendButtonLoading(true);
              setTimeout(() => {
                setIsSendButtonLoading(false);
                setOpen(true);
              }, 2000);
            }}
          >
            <FormControl
              error={name !== null && name.length === 0 ? true : false}
            >
              <label
                htmlFor="name"
                className="font-medium text-gray-900 block mb-1"
              >
                Name
              </label>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                startDecorator={<PersonIcon />}
                placeholder="Enter your name here..."
                required
              />
              {name !== null && name.length === 0 ? (
                <FormHelperText>
                  <InfoOutlined />
                  Your name is required!
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>

            <FormControl
              error={
                email !== null && (email.length === 0 || !validateEmail(email))
                  ? true
                  : false
              }
            >
              <label
                htmlFor="email"
                className="font-medium text-gray-900 block mb-1 mt-5"
              >
                Email
              </label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                startDecorator={<AlternateEmailIcon />}
                placeholder="Enter your email here..."
                required
              />
              {email !== null && email.length === 0 ? (
                <FormHelperText>
                  <InfoOutlined />
                  Your email is required!
                </FormHelperText>
              ) : (
                ""
              )}
              {email !== null && email.length > 0 && !validateEmail(email) ? (
                <FormHelperText>
                  <InfoOutlined />
                  Your email is invalid!
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>

            <FormControl>
              <label
                htmlFor="phoneNumber"
                className="font-medium text-gray-900 block mb-1 mt-5"
              >
                Phone number
              </label>
              <Input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                startDecorator={<PhoneIcon />}
                placeholder="Enter your phone number here..."
              />
            </FormControl>

            <FormControl
              error={message !== null && message.length === 0 ? true : false}
            >
              <label
                htmlFor="message"
                className="font-medium text-gray-900 block mb-1 mt-5"
              >
                Message
              </label>
              <Textarea
                name="message"
                id="message"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm"
                placeholder="Enter your message here..."
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              {message !== null && message.length === 0 ? (
                <FormHelperText>
                  <InfoOutlined />
                  Your message is required!
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>

            <FormHelperText style={{ marginTop: "2rem" }}>
              <PrivacyTipIcon />
              We'll never share your email with anyone else.
            </FormHelperText>

            <Button
              type="submit"
              className="w-full"
              style={{ marginTop: "2rem" }}
              loading={isSendButtonLoading}
              startDecorator={<Send />}
            >
              Send
            </Button>
          </form>
        </div>
      </Section>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog variants="outlined" role="alertdialog">
          <DialogTitle>
            <CheckCircleOutlineIcon />
            Message sent successfully!
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Player
              loop
              autoplay
              src="/lottie-animations/email_sent_animation.json"
              style={{ height: "300px", width: "300px" }}
            />
            <h1 className="font-bold">Thank you for contacting us!</h1>
            Please be patient! We will reach out to you soon!
          </DialogContent>
          <DialogActions>
            <Button variant="solid" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};
