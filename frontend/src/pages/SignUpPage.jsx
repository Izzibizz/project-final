import swoopBottom from "/swoops/swoop-similar-bottom.svg";
import swoopTop from "/swoops/swoop-similar-top.svg";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import animation from "../assets/Circle-loading-Animation.json";
import { Footer } from "../components/Footer";
import { useUserStore } from "../store/useUserStore";

export const SignUpPage = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    address,
    setAddress,
    password,
    setPassword,
    allergies,
    setAllergies,
    pros,
    setPros,
    hair,
    setHair,
    skinType,
    setSkinType,
    registerUser,
    loadingUser,
    signedUp,
    loggedIn,
    setSignedUp,
  } = useUserStore();
  const [activeSection, setActiveSection] = useState("sectionone");

  const [isPassword, setIsPassword] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedPros, setSelectedPros] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sectionCheck, setSectionCheck] = useState(false);

  const navigate = useNavigate();
  const passwordRef = useRef();

  useEffect(() => {
    if (activeSection === "sectionthree") {
      setSectionCheck(true);
    } else {
      setSectionCheck(false);
    }
  }, [activeSection]);

  useEffect(() => {
    setAllergies(selectedAllergies);
  }, [selectedAllergies, setAllergies]);

  useEffect(() => {
    setPros(selectedPros);
  }, [selectedPros, setPros]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const inputPassword = e.target.value;
    const minLength = 8;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    const isValidLength = inputPassword.length >= minLength;
    const isValidPattern = pattern.test(inputPassword);

    setIsPassword(isValidLength && isValidPattern);
  };

  const handleComparePassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsSame(password === e.target.value);
  };

  const handleSectionOne = (e) => {
    e.preventDefault();
    if (isPassword && isSame) {
      setActiveSection("sectiontwo");
    } else {
      if (!isPassword) {
        alert("Make sure you use at least one capital and one number.");
      }
      if (!isSame) {
        alert("The passwords aren't matching!");
      }
    }
  };

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAddress = (e) =>
    setAddress({
      ...address,
      street: e.target.value,
    });
  const handlePostalCode = (e) =>
    setAddress({
      ...address,
      postalCode: e.target.value,
    });
  const handleCity = (e) =>
    setAddress({
      ...address,
      city: e.target.value,
    });
  const handleCountry = (e) =>
    setAddress({
      ...address,
      country: e.target.value,
    });

  const handleSectionTwo = (e) => {
    e.preventDefault();
    if (firstName.length >= 2 && lastName.length >= 2) {
      setActiveSection("sectionthree");
    } else {
      alert("NO!");
    }
  };

  const handleHairShape = (e) =>
    setHair({
      ...hair,
      shape: e.target.value,
    });
  const handleHairMoisture = (e) =>
    setHair({
      ...hair,
      moisture: e.target.value,
    });
  const handleSkin = (e) => setSkinType(e.target.value);

  const handleAllergyCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedAllergies((prevSelectedAllergies) =>
      prevSelectedAllergies.includes(value)
        ? prevSelectedAllergies.filter((item) => item !== value)
        : [...prevSelectedAllergies, value]
    );
  };

  const handleProsCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedPros((prevSelectedPros) =>
      prevSelectedPros.includes(value)
        ? prevSelectedPros.filter((item) => item !== value)
        : [...prevSelectedPros, value]
    );
  };

  const allergyOptions = [
    "Fragrances",
    "Preservatives",
    "Dyes",
    "Metals",
    "Latex",
    "Parabens",
  ];
  const preferenceOptions = ["Organic", "Vegan", "Crueltyfree"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(
      "Register user:",
      firstName,
      lastName,
      email,
      address,
      password,
      allergies,
      pros,
      hair,
      skinType
    );
    registerUser(
      firstName,
      lastName,
      email,
      address,
      password,
      allergies,
      pros,
      hair,
      skinType
    );
    resetFields();
  };

  const resetFields = () => {
    // Section One Fields
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // Section Two Fields
    setFirstName("");
    setLastName("");
    setAddress({
      street: "",
      postalCode: "",
      city: "",
      country: "",
    });

    // Section One Fields
    setSkinType("");
    setHair({
      shape: "",
      moisture: "",
    });
    setSelectedAllergies([]);
    setSelectedPros([]);
  };

  //popup message if successfully signed up
  useEffect(() => {
    if (signedUp) {
      navigate("/");
    }
  }, [signedUp]);

  console.log("signed up", signedUp);

  return (
    <>
      {activeSection === "sectionone" && (
        <section className="bg-main-red h-full flex flex-col items-center text-text-light pb-20 tablet:pb-0 laptop:flex-row laptop:pt-20 laptop:px-36 laptop:pb-64">
          <div className="relative w-full laptop:m-8">
            <img
              className="w-full w-screentablet:order-last laptop:rounded-3xl"
              src="signup.svg"
              alt="picture of a woman using skincare."
            />
            <img
              className="bg-transparent w-full laptop:hidden absolute bottom-0"
              src={swoopBottom}
              alt="Section border"
            />
          </div>

          <div className="w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-heading font-bold mt-10 tablet:mt-20">
                Sign Up
              </h2>
              <h3 className="text-xl font-heading font-medium mt-3">
                login Information
              </h3>
            </div>
            <form className="flex flex-col w-full text-text-dark px-10 tablet:px-36 laptop:pl-0 laptop:pr-12">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="email"
                  className="text-text-dark font-heading font-semibold mt-8 tablet:block"
                >
                  Email:
                </label>
                <input
                  value={email}
                  type="email"
                  className="rounded-xl h-10 bg-bg-input tablet:block tablet:w-full pl-4"
                  id="email"
                  onChange={handleEmail}
                />
              </div>
              <div className="flex flex-col tablet:flex-row tablet:gap-5">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="password"
                    className="text-text-dark font-heading font-semibold mt-8"
                  >
                    Password:
                  </label>
                  <input
                    value={password}
                    type="password"
                    className="rounded-xl h-10 bg-bg-input pl-4"
                    id="password"
                    onChange={handlePassword}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="confirm"
                    className="text-text-dark font-heading font-semibold mt-8"
                  >
                    Confirm password:
                  </label>
                  <input
                    value={confirmPassword}
                    type="password"
                    className="rounded-xl h-10 bg-bg-input pl-4"
                    id="confirm"
                    onChange={handleComparePassword}
                  />
                </div>
              </div>
              <button
                ref={passwordRef}
                onClick={handleSectionOne}
                className="bg-main-yellow h-8 w-28 self-center mt-14 rounded-3xl text-text-dark font-heading tablet:mb-20 tablet:self-end"
              >
                Next
              </button>
            </form>
          </div>
        </section>
      )}
      {activeSection === "sectiontwo" && (
        <section className="bg-main-red h-full flex flex-col items-center text-text-light px-10 pb-20 tablet:p-0 laptop:flex-row laptop:pt-20 laptop:px-36 laptop:pb-64">
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-heading font-bold mt-10">Sign Up</h2>
              <h3 className="text-xl font-heading font-medium mt-3">
                personal Information
              </h3>
            </div>
            <form className="flex flex-col text-text-dark w-full tablet:px-36 tablet:pb-10 laptop:pl-0 laptop:pr-12 laptop:flex-row">
              <div className="flex flex-col mt-8 tablet:flex-row tablet:gap-5 laptop:flex-col laptop:gap-0 laptop:pr-5">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="firstname"
                    className=" font-heading font-semibold"
                  >
                    Firstname:
                  </label>
                  <input
                    value={firstName}
                    className="rounded-xl h-10 bg-bg-input pl-4"
                    id="firstname"
                    onChange={handleFirstName}
                  />
                </div>
                <div className="flex flex-col w-full mt-2 tablet:mt-0 laptop:mt-2">
                  <label
                    htmlFor="lastname"
                    className="text-text-dark font-heading font-semibold"
                  >
                    Lastname:
                  </label>
                  <input
                    value={lastName}
                    id="lastname"
                    className="rounded-xl h-10 bg-bg-input pl-4"
                    onChange={handleLastName}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mt-10 flex flex-col laptop:mt-8">
                  <div className="flex flex-col tablet:flex-row tablet:gap-5 laptop:flex-col laptop:gap-0">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="address"
                        className="text-text-dark font-heading font-semibold"
                      >
                        Address:
                      </label>
                      <input
                        value={address.street}
                        id="address"
                        className="rounded-xl h-10 bg-bg-input pl-4"
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="postal code"
                        className="text-text-dark font-heading font-semibold mt-2 tablet:mt-0 laptop:mt-2"
                      >
                        Postal code:
                      </label>
                      <input
                        value={address.postalCode}
                        id="postal code"
                        className="rounded-xl h-10 bg-bg-input pl-4"
                        onChange={handlePostalCode}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col tablet:flex-row tablet:gap-5 laptop:flex-col laptop:gap-0">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="city"
                        className="text-text-dark font-heading font-semibold mt-2"
                      >
                        City:
                      </label>
                      <input
                        value={address.city}
                        id="city"
                        className="rounded-xl h-10 bg-bg-input pl-4"
                        onChange={handleCity}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="country"
                        className="text-text-dark font-heading font-semibold mt-2"
                      >
                        Country:
                      </label>
                      <input
                        value={address.country}
                        id="country"
                        className="rounded-xl h-10 bg-bg-input pl-4"
                        onChange={handleCountry}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSectionTwo}
                  className="bg-main-yellow h-8 w-28 self-center mt-12 rounded-3xl text-text-dark font-heading tablet:mb-10 tablet:self-end"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
          <div className="relative">
            <img
              className="bg-transparent w-full laptop:hidden absolute -top-5"
              src={swoopTop}
              alt="Section border"
            />
            <img
              className="hidden tablet:block tablet:w-screen laptop:rounded-3xl laptop:max-w-3xl"
              src="signup.svg"
              alt="picture of a woman using skincare."
            />
            <img
              className="bg-transparent w-full laptop:hidden absolute -bottom-2"
              src={swoopBottom}
              alt="Section border"
            />
          </div>
        </section>
      )}
      {activeSection === "sectionthree" && (
        <section className="bg-light-yellow h-full flex flex-col items-center text-text-dark px-10 pb-20 tablet:px-0 laptop:items-start">
          <h2 className="text-2xl font-heading font-bold mt-20 laptop:px-36">
            Who are you?
          </h2>
          <h3 className="text-xl font-heading font-medium mt-8 text-center tablet:px-44 laptop:px-36">
            Personalize your account to get custom recommendations
          </h3>
          <form className="flex flex-col w-full mt-16 tablet:px-36">
            <div className="flex flex-col tablet:flex-row tablet:gap-5 laptop:gap-40">
              <div className="flex flex-col w-full">
                <div className="flex">
                  <img src="skintype02.svg" alt="Icon of a face" />
                  <label
                    htmlFor="skin"
                    className="font-heading font-bold text-2xl mt-9 ml-5"
                  >
                    Skin:
                  </label>
                </div>
                <label
                  htmlFor="skintype"
                  className="font-heading font-bold text-xl mt-5 mb-0"
                >
                  Type
                </label>
                <select
                  name="skintype"
                  id="skin"
                  className="mt-2 h-8 rounded-md font-heading font-bold text-sm pl-4 bg-bg-input appearance-none bg-no-repeat bg-arrow-select bg-right"
                  onChange={handleSkin}
                >
                  <option
                    value=""
                    selected
                    disabled
                    className="font-heading font-bold bg-bg-input"
                  >
                    - Choose skin type
                  </option>
                  <option
                    value="sensitive"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Sensitive
                  </option>
                  <option
                    value="dry"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Dry
                  </option>
                  <option
                    value="oily"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Oily
                  </option>
                  <option
                    value="combination"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Combination
                  </option>
                  <option
                    value="acne"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Acne
                  </option>
                </select>
              </div>
              <div className="flex flex-col w-full mt-10 tablet:mt-0">
                <div className="flex">
                  <img src="hairtype02.svg" alt="Icon of hair" />
                  <label className="font-heading font-bold text-2xl mt-9 ml-5">
                    Hair:
                  </label>
                </div>
                <label
                  htmlFor="moisture"
                  className="font-heading font-bold text-xl mt-5"
                >
                  Moisture
                </label>
                <select
                  name="hair-moisture"
                  id="moisture"
                  className="mt-2 h-8 rounded-md font-heading font-bold text-sm pl-4 bg-bg-input appearance-none bg-no-repeat bg-arrow-select bg-right"
                  onChange={handleHairMoisture}
                >
                  <option
                    value=""
                    selected
                    disabled
                    className="font-heading font-bold bg-bg-input"
                  >
                    - Choose hair moisture level
                  </option>
                  <option
                    value="dry"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Dry
                  </option>
                  <option
                    value="normal"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Normal
                  </option>
                  <option
                    value="oily"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Oily
                  </option>
                </select>
                <label
                  htmlFor="shape"
                  className="font-heading font-bold text-xl mt-5"
                >
                  Shape
                </label>
                <select
                  name="hair-shape"
                  id="shape"
                  className="mt-2 h-8 rounded-md font-heading font-bold pl-4 text-sm bg-bg-input appearance-none bg-no-repeat bg-arrow-select bg-right"
                  onChange={handleHairShape}
                >
                  <option
                    value=""
                    selected
                    disabled
                    className="font-heading font-bold bg-bg-input"
                  >
                    - Choose hair shape
                  </option>
                  <option
                    value="straight"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Straight
                  </option>
                  <option
                    value="wavy"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Wavy
                  </option>
                  <option
                    value="curly"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Curly
                  </option>
                  <option
                    value="coils"
                    className="font-heading font-bold bg-bg-input"
                  >
                    Coils
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col tablet:flex-row tablet:justify-between laptop:w-2/3 latop:m-auto laptop:justify-start laptop:gap-24">
              <div className="flex flex-col mt-8 tablet:gap-5 laptop:flex-col laptop:gap-0 laptop:pr-5">
                <div className="flex">
                  <img
                    src="allergies02.svg"
                    alt="Icon of hand with allergies"
                  />
                  <label
                    htmlFor="allergies"
                    className="font-heading font-bold text-2xl mt-9 ml-5"
                  >
                    Allergies:
                  </label>
                </div>

                {allergyOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      value={option.toLowerCase()}
                      checked={selectedAllergies.includes(option.toLowerCase())}
                      onChange={handleAllergyCheckboxChange}
                    />
                    {option}
                  </label>
                ))}
              </div>

              <div className="flex flex-col mt-10">
                <div className="flex">
                  <img src="preferences02.svg" alt="Icon of a heart" />
                  <label
                    htmlFor="preferences"
                    className="font-heading font-bold text-2xl mt-9 ml-5"
                  >
                    Preferences:
                  </label>
                </div>
                {preferenceOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      value={option.toLowerCase()}
                      checked={selectedPros.includes(option.toLowerCase())}
                      onChange={handleProsCheckboxChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={() => setActiveSection("sectionone")}
              className="bg-bg-input h-8 w-28 self-center mt-14 rounded-3xl text-text-dark font-heading"
            >
              Go back
            </button>
            <button
              disabled={loadingUser}
              onClick={handleSubmit}
              className="bg-light-orange h-8 w-40 self-center mt-6 rounded-3xl text-text-light font-heading"
            >
              {loadingUser ? (
                <div className="flex items-center justify-center">
                  <span>Creating user...</span>
                  <Lottie
                    animationData={animation}
                    loop={true}
                    autoPlay
                    style={{ width: 30, height: 30, marginLeft: 8 }}
                  />
                </div>
              ) : (
                "Create Profile"
              )}
            </button>
          </form>
        </section>
      )}

      {sectionCheck ? (
        <img
          className="bg-light-yellow w-full"
          src={swoopBottom}
          alt="Section border"
        />
      ) : null}
      <Footer aboveColor={"red"} />
    </>
  );
};
