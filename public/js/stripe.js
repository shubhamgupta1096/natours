/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourID) => {
  try {
    const stripe = Stripe(
      'pk_test_51Iuh7QSJ95lnCZRcwaMx8XILYU5rxh32YUesfUBTO2ow6HD5m7O6kBfWFolj1Sai3BQOWK95EMyvGQGcmknJqYGD00V7xprdbh'
    );
    //1. Get the session from the API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourID}`
    );

    console.log(session);
    //2.Create the checkout form + charge the credit card for us
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
