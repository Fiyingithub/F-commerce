// ToastContext.js
import { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ToastContext = createContext();

// Create a provider component
export const ToastProvider = ({ children }) => {
  const notifySuccess = (message, options = {}) => toast.success(message, options);
  const notifyError = (message, options = {}) => toast.error(message, options);
  const notifyInfo = (message, options = {}) => toast.info(message, options);
  const notifyWarn = (message, options = {}) => toast.warn(message, options);
  const [waitingLoader, setWaitingLoader] = useState(false);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const cartId = localStorage.getItem('cartId')

  const showSpinnerLoader = () => {
    setSpinnerLoader(true)
  }
  const hideSpinnerLoader = () => {
    setSpinnerLoader(false)
  }

  const startWaitingLoader = () => {
    setWaitingLoader(true)
  }

  const stopWaitingLoader = () => {
    setWaitingLoader(false)
  }

  // Add to cart
  const addToCart = async (item) => {
    startWaitingLoader()
    try {
      if (!cartId) {
        const response = await axios.post('https://oneworld-fq81.onrender.com/api/Cart/create');
        localStorage.setItem('cartId', response.data.cartId)
        stopWaitingLoader()
        // console.log(response.data)

        try {
          const res = await axios.post(`https://oneworld-fq81.onrender.com/api/Cart/${response.data.cartId}/add-item`, item);
          console.log(res.data)
          stopWaitingLoader()
        } catch (err) {
          console.log(err)
          stopWaitingLoader()
        }

        return
      }

      if (cartId) {
        try {
          const res = await axios.post(`https://oneworld-fq81.onrender.com/api/Cart/${cartId}/add-item`, item);
          console.log(res.data)
          stopWaitingLoader()
        } catch (err) {
          console.log(err)
          stopWaitingLoader()
        }
      }
    } catch (error) {
      notifyError('Error adding item to cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      stopWaitingLoader()
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function formatNumberWithCommas(number) {
    number = Number(number);
    return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }

  const formatAmount = (amt) =>
    amt
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError, notifyInfo, notifyWarn, waitingLoader, startWaitingLoader, stopWaitingLoader, spinnerLoader, showSpinnerLoader, hideSpinnerLoader, addToCart, formatDate, formatNumberWithCommas, formatAmount }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);