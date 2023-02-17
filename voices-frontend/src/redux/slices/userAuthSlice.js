const {createSlice}= require("@reduxjs/toolkit");

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isAuth:false,
        user:null,
        otp:{
            phone:"",
            hash:"",
        }
    },
    reducers:{
        setAuth:(state,action)=>{
           const user=action.payload.user;
           state.user=user;
           state.isAuth=true;
        },
        setOtp: (state,action)=>{
            state.otp.phone=action.payload.phone;
            state.otp.hash=action.payload.hash;
        }
    }


})

export const {setAuth,setOtp}=authSlice.actions;

export default authSlice.reducer;