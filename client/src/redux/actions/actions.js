import axios from "axios";
const URL = "https://naka-restaurant-e4eq.vercel.app"
// const URL = "http://localhost:3001";
// Login / logout / register .30
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const REMOVE_SESSION = "REMOVE_SESSION";
export const SET_GOOGLE_USER = "SET_GOOGLE_USER";
export const SET_STORAGED_USER = "SET_STORAGED_USER";
//Fetch data  .89
export const GET_ALL_DISHES = "GET_ALL_DISHES";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_USER_ORDERS = "GET_USER_ORDERS";
export const GET_USER_ADDRESSES = "GET_USER_ADDRESSES";
//Filtros 130
export const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
export const REMOVE_CATEGORY_FILTER = "REMOVE_CATEGORY_FILTER";
export const SET_DISPLAYED_DISHES = "SET_DISPLAYED_DISHES";
// Carrito .157
export const ADD_FIRST_PRODUCT = "ADD_FIRST_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REMOVE_MANY_PRODUCTS = "REMOVE_MANY_PRODUCTS";
//CRUD Usuario... .204
export const CREATE_PAYMENT = "CREATE_PAYMENT";
export const CREATE_ADDRESS = "CREATE_ADDRESS";
export const DELETE_ADDRESS = "DELETE_ADDRESS";
//DASHBOARD
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_ORDERS_BY_ID = "GET_USER_ORDERS_BY_ID";
export const UPDATE_USER_STATUS = "UPDATE_USER_STATUS";
export const SET_ORDERINGS = "SET_ORDERINGS";
export const CREATE_DISH = "CREATE_DISH";

// Login / logout / register
export const loginUser = (credentials) => {
  return async function (dispatch) {
    try {
      // const response = await axios.post(`http://localhost:3001/users/login`,credentials);
      const response = await axios.post(`${URL}/users/login`, credentials);
      dispatch({
        type: LOGIN_USER,
        payload: { user: response.data, cart: response.data.cart },
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
};
export const registerUser = (userData) => {
  return async function (dispatch) {
    try {
      // const res = await axios.post(
      //   "http://localhost:3001/users/register",
      //   userData
      // );
      const res = await axios.post(`${URL}/users/register`, userData);
      return res;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
};
export const removeSession = () => {
  return async function (dispatch) {
    dispatch({
      type: REMOVE_SESSION,
      payload: null,
    });
  };
};
export const setGoogleUser = (user) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("http://localhost:3001/users/googlelogin", user)
		
			dispatch({type: SET_GOOGLE_USER, 	payload: {user: res.data}})
			return res.status
		} catch (error) {
			console.log(error);
		}
	}
}
export const setStoragedUser = (user) => {
  return async function (dispatch) {
    try {
      // const response = await axios.get(
      //   `http://localhost:3001/users/${user._id}`
      // );
      const response = await axios.get(`${URL}/users/${user._id}`);

      dispatch({
        type: SET_STORAGED_USER,
        payload: { user: response.data, cart: response.data.cart },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
//Fetch data
export const getAllDishes = () => {
  return async (dispatch) => {
    try {
      // const response = await axios(`http://localhost:3001/dishes`);
      const response = await axios(`${URL}/dishes`);
      return dispatch({
        type: GET_ALL_DISHES,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};
export const getCategories = () => {
  return async (dispatch) => {
    try {
      // const response = await axios.get(`http://localhost:3001/categories`);
      const response = await axios.get(`${URL}/categories`);
      const categories = response.data.map((category) => category);
      return dispatch({ type: GET_CATEGORIES, payload: categories });
    } catch (error) {
      throw Error(error);
    }
  };
};
export const getUserOrders = (userId) => {
  return async function (dispatch) {
    try {
      // const response = await axios.get(
      //   `http://localhost:3001/orders/${userId}`
      // );
      if (!userId) return;
      const response = await axios.get(`${URL}/orders/${userId}`);
      return dispatch({
        type: GET_USER_ORDERS,
        payload: { orders: response.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getUserAddresses = (userId) => {
  return async function (dispatch) {
    try {
      // const response = await axios.get(
      //   `http://localhost:3001/addresses/${userId}`
      // );
      if (!userId) return;
      const response = await axios.get(`${URL}/addresses/${userId}`);
      return dispatch({
        type: GET_USER_ADDRESSES,
        payload: { addresses: response.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
//filtros
export const setCategoryFilter = (name) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CATEGORY_FILTER,
      payload: { name },
    });
  };
};
export const removeCategoryFilter = (name) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_CATEGORY_FILTER,
      payload: { name },
    });
  };
};
export const setDisplayedDishes = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_DISPLAYED_DISHES,
      payload: null,
    });
  };
};
//carrito
export const addFirstProduct = ({ product }) => {
  return async function (dispatch) {
    dispatch({
      type: ADD_FIRST_PRODUCT,
      payload: { product },
    });
  };
};
export const addProduct = (product) => {
  return async function (dispatch) {
    dispatch({
      type: ADD_PRODUCT,
      payload: { product },
    });
  };
};
export const removeProduct = (product) => {
  return async function (dispatch) {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: { product },
    });
  };
};
export function removeManyProducts(product) {
  return async (dispatch) => {
    return dispatch({ type: REMOVE_MANY_PRODUCTS, payload: { product } });
  };
}
export const saveCart = ({ userId, cart }) => {
  return async function () {
    if (!userId) return;
    // await axios.put(`http://localhost:3001/users/cart/${userId}`, { cart });
    await axios.put(`${URL}/users/cart/${userId}`, { cart });
  };
};
//CRUD Usuario
export const createPayment = (cart, userId, address, username) => {
  return async () => {
    const response = await axios.post(`${URL}/payment/create`, {
      cart,
      userId,
      address,
      username,
    });
    window.location.href = response.data.body.init_point;
  };
};
export const createAddress = (userId, addressData) => {
  return async (dispatch) => {
    try {
      // const {data, status} = await axios.post(`http://localhost:3001/addresses/${userId}`, addressData)
      if (!userId) return;
      const { data, status } = await axios.post(
        `${URL}/addresses/${userId}`,
        addressData
      );
      dispatch({
        type: CREATE_ADDRESS,
        payload: { address: data },
      });
      console.log(status);
      return status;
    } catch (error) {
      console.log(error);
      return error.response.status;
    }
  };
};
export const deleteAddress = (_id, userId) => {
  return async () => {
    try {
      // const {status} = await axios.delete(`http://localhost:3001/addresses/${_id}/${userId}`)
      if (!_id) return;
      const { status } = await axios.delete(
        `${URL}/addresses/${_id}/${userId}`
      );
      return status;
    } catch (error) {
      console.log(error);
      return 400;
    }
  };
};
// DASHBOARD ADMIN

export function getAllUsers() {
  return async (dispatch) => {
    try {
      // const users = await axios.get(`http://localhost:3001/users`);
      const users = await axios.get(`${URL}/users`);
      return dispatch({ type: GET_ALL_USERS, payload: { users: users.data } });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getAllOrders() {
  return async (dispatch) => {
    try {
      // const orders = await axios.get(`http://localhost:3001/orders`);
      const orders = await axios.get(`${URL}/orders`);
      return dispatch({
        type: GET_ALL_ORDERS,
        payload: { orders: orders.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const getUserOrdersById = (userId) => {
  return async (dispatch) => {
    try {
      if (!userId) return;
      const orders = await axios.get(`${URL}/orders/${userId}`);
      return dispatch({
        type: GET_USER_ORDERS_BY_ID,
        payload: { orders: orders.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateOrderStatus = (_id, status) => {
  return async () => {
    console.log(_id, status);
    try {
      if (!_id) {
        return;
      }
      console.log(_id);
      console.log(status);
      // const res = await axios.put(`http://localhost:3001/orders/${_id}`, {status});
      const res = await axios.put(`${URL}/orders/${_id}`, { status });

      return res;
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateUserStatus = (_id, status) => {
  return async () => {
    try {
      if (!_id) {
        return;
      }
      // const response = await axios.put(`http://localhost:3001/users/status/${_id}`, {status})
      const response = await axios.put(`${URL}/users/status/${_id}`, {
        status,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateDish = (_id, newDish) => {
  return async function (dispatch) {
   const response = await axios.put(`${URL}/dishes/${_id}`, newDish);
		return response.status
	};
};
export const createDish = (payload) => {
  try {
    return async function () {
      const form = new FormData();

      for (const key in payload) {
        form.append(key, payload[key]);
      }
      console.log(form);
      
			const response = await axios.post(`${URL}/dishes`, form, {
      	headers: {
      		"Content-Type": "multipart/form-data",
      	},
      });
			return response
    };
    // eslint-disable-next-line
  } catch (error) {
    console.log(error);
  }
};
export const deleteDish = (_id) => {
	return async () => {
		try {
			const {status} = await axios.delete(`${URL}/dishes/${_id}`);
			return status
		} catch (error) {
			console.log(error);
		}
	}
}
