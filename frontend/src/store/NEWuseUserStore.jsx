import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NEWuseUserStore = create(
  persist(
    (set, get) => ({
      user: {},
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      address: {
        street: "",
        postalCode: "",
        city: "",
        country: "",
      },
      password: "",
      accessToken: "",
      allergies: [],
      pros: [],
      hair: {
        shape: "",
        moisture: "",
      },
      skinType: [],
      signedUp: false,
      loadingUser: false,
      loggedIn: false,
      showWelcomePopup: false,
      loggedOut: false,
      automaticLogOut: false,

      //Functions to update userInfo
      setFirstName: (Input) => set({ firstName: Input }),
      setLastName: (Input) => set({ lastName: Input }),
      setEmail: (Input) => set({ email: Input }),
      setAddress: (Input) => set({ address: Input }),
      setPassword: (Input) => set({ password: Input }),
      setAllergies: (Input) => set({ allergies: Input }),
      setPros: (Input) => set({ pros: Input }),
      setHair: (Input) => set({ hair: Input }),
      setHairShape: (Input) => set({ hairShape: Input }),
      setHairMoisture: (Input) => set({ hairMoisture: Input }),
      setSkinType: (Input) => set({ skinType: Input }),

      //messages
      setSignedUp: (input) => set({ signedUp: input }),
      setShowWelcomePopup: (input) => set({ showWelcomePopup: input }),
      setLoggedOut: (input) => set({ loggedOut: input }),
      setAutomaticLogOut: (input) => set({ automaticLogOut: input }),

      //Fetch functions
      registerUser: (
        firstName,
        lastName,
        email,
        address,
        password,
        allergies,
        pros,
        hair,
        skinType
      ) => {
        fetch("https://project-final-glim.onrender.com/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            address: address,
            password: password,
            allergies: allergies,
            pros: pros,
            hair: hair,
            skin: skinType,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.accessToken) {
              set({
                ...state,
                signedUp: true,
                user: { ...state.user, accessToken: data.accessToken },
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      fetchUserProfile: (id, accessToken) => {
        fetch(`https://project-final-glim.onrender.com/users/profile/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.user) {
              set({ User: data.user });
              set({ accessToken: data.accessToken });
              /* set({ userId: id }); */
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      loginUser: (email, password) => {
        fetch("https://project-final-glim.onrender.com/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.accessToken) {
              set({
                ...state,
                loggedIn: true,
                user: { ...state.user, accessToken: data.accessToken },
              });
              fetchUserProfile(data.id, data.accessToken);
              set({ showWelcomePopup: true });
              setTimeout(() => {
                automaticLogOut(true);
              }, 360000); //1 hour
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      updateUserProfile: (userId, data) => {
        fetch(
          `https://project-final-glim.onrender.com/users/profile/${userId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: data,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.updatedUser) {
              setUser(data.updatedUser);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      deleteUserProfile: (id) => {
        fetch(
          `https://project-final-glim.onrender.com/users/profile/${userId}`,
          {
            method: "DELETE",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.message === "User was successfully deleted.") {
              setUser({});
              setUserid("");
              loggedOut(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },
    }),
    {
      name: "userStore",
    }
  )
);
