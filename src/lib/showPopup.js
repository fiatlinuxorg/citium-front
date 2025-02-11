import Popup from "../components/Popup.svelte";
import Confirmation from "../components/Confirmation.svelte";

const showPopup = (type, title, message) => {
  const popup = new Popup({
    target: document.body,
    props: {
      type,
      title,
      message,
    },
  });

  return popup;
};

const showConfirmation = (title, message, onConfirm) => {
  const confirmation = new Confirmation({
    target: document.body,
    props: {
      title: title,
      message: message,
      onConfirm: onConfirm,
    },
  });

  return confirmation;
}
  

export { showPopup, showConfirmation };