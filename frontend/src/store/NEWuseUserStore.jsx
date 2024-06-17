import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
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
      setHairShape: (Input) => set({ hairShape: Input }),
      setHairMoisture: (Input) => set({ hairMoisture: Input }),
      setSkinType: (Input) => set({ skinType: Input }),

      //messages
      setSignedUp: (input) => set({ signedUp: input }),
      setShowWelcomePopup: (input) => set({ showWelcomePopup: input }),
      setLoggedOut: (input) => set({ loggedOut: input }),
      setAutomaticLogOut: (input) => set({ automaticLogOut: input }),

      //Fetch functions
      registerUser: (data) => {
        fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.accessToken) {
              set({ accessToken: data.accessToken });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      loginUser: (data) => {
        fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.accessToken) {
              set({ accessToken: data.accessToken });
              setSignedUp(true);
              setShowWelcomePopup(false);
              setTimeout(() => {
                automaticLogOut(true);
              }, 3600000); //1 hour
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      fetchUserProfile: (id) => {
        fetch(`/profile/${id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.user) {
              setUser(data.user);
              setUserid(id);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },

      updateUserProfile: (id, data) => {
        fetch(`/profile/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: data,
        })
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
        fetch(`/profile/${id}`, {
          method: "DELETE",
        })
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
