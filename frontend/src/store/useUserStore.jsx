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
      hairShape: "",
      hairMoisture: "",
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
      // setHairShape: (Input) => set({ hairShape: Input }),
      // setHairMoisture: (Input) => set({ hairMoisture: Input }),
      setSkinType: (Input) => set({ skinType: Input }),
      //messages
      setSignedUp: (input) => set({ signedUp: input }),
      setShowWelcomePopup: (input) => set({ showWelcomePopup: input }),
      setLoggedOut: (input) => set({ loggedOut: input }),
      setAutomaticLogOut: (input) => set({ automaticLogOut: input }),

      //Register user
      registerUser: async (
        firstName,
        lastName,
        email,
        address,
        password,
        allergies,
        pros,
        hair,
        // hairShape,
        // hairMoisture,
        skinType
      ) => {
        set({ loadingUser: true });
        const URL_register =
          "https://project-final-glim.onrender.com/users/register";
        try {
          const response = await fetch(URL_register, {
            method: "POST",
            body: JSON.stringify({
              firstname: firstName,
              lastname: lastName,
              email: email,
              address: address,
              password: password,
              allergies: allergies,
              pros: pros,
              hair: hair,
              // hairShape: hairShape,
              // hairMoisture: hairMoisture,
              skin: skinType,
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) {
            throw new Error("Could not fetch");
          }
          const data = await response.json();
          console.log(data);
          set({ accessToken: data.accessToken });
        } catch (error) {
          console.error("error:", error);
          set({ error: error });
        } finally {
          set({ loadingUser: false });
          set({ signedUp: true });
        }
      },

      fetchUser: async (id, accessToken) => {
        set({ loadingUser: true });
        const URL = `https://project-final-glim.onrender.com/users/profile/${id}`;
        try {
          const response = await fetch(URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          });

          if (!response.ok) {
            throw new Error("Could not fetch user");
          }
          const data = await response.json();
          console.log(data);
          set({
            user: data,
          });
              return { success: true, user: data };
        } catch (error) {
          console.error("error:", error);
          set({ error: error });
              return { success: false, message: error.message };
        } finally {
          set({ loadingUser: false });
        }
      },

      loginUser: async (email, password) => {
        set({ loadingUser: true });
        const URL_login = "https://project-final-glim.onrender.com/users/login";
        try {
          const response = await fetch(URL_login, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) {
            throw new Error("could not fetch");
          }
          const data = await response.json();

          if (data.accessToken) {
            set({
              userId: data.id,
              accessToken: data.accessToken,
              loggedIn: true,
              showWelcomePopup: true,
            });
            await get().fetchUser(data.id, data.accessToken);
          }
        } catch (error) {
          console.error("error in login:", error);
          set({ error: error });
        } finally {
          /*  fetchUser(userId, accessToken); */
          set({ loadingUser: false });
        }
      },

      updateUser: async (userId, accessToken, updatedFields) => {
        /* set({ loadingUser: true }); */
        const URL = `https://project-final-glim.onrender.com/users/profile/${userId}`;
        console.log("Updated Fields", updatedFields);
        try {
          const response = await fetch(URL, {
            method: "PATCH",
            body: JSON.stringify({
              firstname: updatedFields.firstname,
              lastname: updatedFields.lastname,
              email: updatedFields.email,
              address: {
                street: updatedFields.address.street,
                postalCode: updatedFields.address.postalCode,
                city: updatedFields.address.city,
                country: updatedFields.address.country,
              },
              allergies: updatedFields.allergies,
              pros: updatedFields.pros,
              hair: {
                moisture: updatedFields.hair.moisture,
                shape: updatedFields.hair.shape,
              },
              skin: updatedFields.skin,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          });
          if (!response.ok) {
            const errorText = await response.text(); // Get the error message
            throw new Error(errorText);

            /*  throw new Error("Could not fetch user"); */
          }
          const data = await response.json();
          console.log(data);
          set({
            user: data,
          });
        } catch (error) {
          console.error("error updating user:", error);
          set({ error: error });
        } finally {
          /*  set({ loadingUser: false }); */
        }
      },

      logoutUser: () => {
        set({
          user: {},
          userId: "",
          accessToken: "",
          loggedIn: false,
          loggedOut: true,
        });
      },

      deleteUser: async (userId, accessToken) => {
        /* set({ loadingUser: true }); */
        const URL = `https://project-final-glim.onrender.com/users/profile/${userId}`;
        console.log("Inside the delete user path", accessToken, userId);
        try {
          const response = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          });

          if (!response.ok) {
            const errorText = await response.text(); // Get the error message
            throw new Error(errorText);

            /*  throw new Error("Could not fetch user"); */
          }

          const data = await response.json();
          console.log(data);
          set({
            loggedIn: false,
            loggedOut: true,
          });
        } catch (error) {
          console.error("error:", error);
          set({ error: error });
        } finally {
          /*  set({ loadingUser: false }); */
        }
      },
    }),
    {
      name: "User-storage",
    }
  )
);
