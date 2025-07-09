import mongoose from "mongoose";
import { ITable,TableSchema } from "./table";

export interface InUseTable {
  table: ITable;
  _id: string;
  player_name1: string;
  player_name2?: string;
  player_name3?: string;
  player_name4?: string;
  game_type: string;
  game_mode: string;
  friendly_match: boolean;
  date: string;
  created_by: mongoose.Types.ObjectId;
}

const InUseTableSchema = new mongoose.Schema<InUseTable>({
    _id: {
        type: String,
        required: true,
    },
    date:{
      type:String,
      required:true,
    },
    player_name1:{
        type:String,
        required:true
    },
    player_name2:{
        type:String,
    },
    player_name3:{
        type:String,
    },
    player_name4:{
        type:String,
    },
    friendly_match:{
        type:Boolean,
        required:true
    },
    table:{
        type:TableSchema,
        required:true
    },
    game_mode:{
        type:String,
        required:true
    },
    game_type:{
        type:String,
        required:true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


export const InUseTable = mongoose.models.InUseTable || mongoose.model('InUseTable', InUseTableSchema);