import mongoose from "mongoose";


export interface UserBillTable {
  _id: string;
  inUseTable: any;
  winner: string;
  loser: string;
  total_bill: number | undefined;
  total_frame?: number;
  total_time?: number;
  date?: string;
  game_type: string;
  status?: string;
  created_by?:any
}

const customerSchema = new mongoose.Schema<UserBillTable>({
   _id:{
    type:String,
    required:true
   },
   inUseTable:{
    type:{},
    required:true
   },
   winner:{
    type:String,
    required:true
   },
   loser:{
    type:String,
    required:true
   },
   total_bill:{
    type:Number,
    required:true
   },
   date:{
    type:String,
    required:true
   },
   game_type:{
    type:String,
    required:true
   },
   status:{
    type:String,
    default:"unpaid"
   },
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   }

});


export const GameHistory = mongoose.models.GameHistory || mongoose.model('GameHistory', customerSchema);