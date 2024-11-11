import { createContext, useState } from "react";

const defaultValue = {
  setUserMeelanIDs: () => {},
  userMeelanIDs: null,
  setUserMeelanData: () => {},
  userMeelanData: null,
  genderGroupf: "Male", // Default value set here
  setGenderGroupf: () => {},
  ageGroupf: undefined,
  setAgeGroupf: () => {},
  professionGroupf: undefined,
  setProfessionGroupf: () => {},
  maritalGroupf: undefined,
  setMaritalGroupf: () => {},
  educationGroupf: undefined,
  setEducationGroupf: () => {},
  gotraExcludeGroupf: undefined,
  setGotraExcludeGroupf: () => {},
  setUserCustomDataMeta: () => {},
  userCustomDataMeta: undefined,
  resetUserDataState: false,
  setResetUserDataState: () => {},
  userStatusGroup: undefined,
  setUserStatusGroup: () => {},
};

const MeelanContext = createContext(defaultValue);

const MeelanProvider = ({ children }) => {
  const [userMeelanIDs, setUserMeelanIDs] = useState(null);
  const [userMeelanData, setUserMeelanData] = useState(null);
  const [genderGroupf, setGenderGroupf] = useState("Female");
  const [ageGroupf, setAgeGroupf] = useState("20-24");
  const [userStatusGroup, setUserStatusGroup] = useState();
  const [professionGroupf, setProfessionGroupf] = useState("");
  const [maritalGroupf, setMaritalGroupf] = useState(
    undefined
  );
  const [educationGroupf, setEducationGroupf] = useState(
    undefined
  );
  const [gotraExcludeGroupf, setGotraExcludeGroupf] = useState(
    undefined
  );

  const [userCustomDataMeta, setUserCustomDataMeta] = useState(undefined);

  const [resetUserDataState, setResetUserDataState] = useState(false);

  return (
    <MeelanContext.Provider
      value={{
        setUserStatusGroup,
        userStatusGroup,
        userCustomDataMeta,
        setUserCustomDataMeta,
        userMeelanIDs,
        userMeelanData,
        genderGroupf,
        ageGroupf,
        professionGroupf,
        maritalGroupf,
        educationGroupf,
        gotraExcludeGroupf,
        setUserMeelanIDs,
        setUserMeelanData,
        setGenderGroupf,
        setAgeGroupf,
        setProfessionGroupf,
        setMaritalGroupf,
        setEducationGroupf,
        setGotraExcludeGroupf,
        resetUserDataState,
        setResetUserDataState,
      }}
    >
      {children}
    </MeelanContext.Provider>
  );
};

export { MeelanProvider, MeelanContext };
