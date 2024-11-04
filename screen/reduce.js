const initialState = {
    firstname: '',
    lastname: '',
    dob : "",
    phonenumber :"",
    email :"",
    district:"",
    state :"",
    city :"",
    gender:"",
    password:"",
    conformpassword :""
  };
function Reducer (state = initialState ,action) {
    switch (action.type) {
        case 'SET_firstname':
          return { ...state,firstname : action.payload };
        case 'SET_lastname':
          return { ...state, lastname: action.payload };
          case 'SET_DOB':
            return { ...state, dob: action.payload };
            case 'SET_phonenumber':
              return { ...state, phonenumber: action.payload };
              case 'SET_Email':
                return { ...state, email: action.payload };
                case 'SET_District':
                  return { ...state, district: action.payload };
                  case 'SET_state':
                    return { ...state, state: action.payload };
                    case 'SET_city':
                    return { ...state, city: action.payload };
                    case 'SET_gender':
                      return { ...state, gender: action.payload };
                      case 'SET_password':
                      return { ...state, password: action.payload };
                      case 'SET_conformpassword':
                      return { ...state, gender: action.payload };
        default:
          return state;
      }
}  
export default Reducer