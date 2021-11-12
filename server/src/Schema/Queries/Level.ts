import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { TransactionType } from "../TypeDefs/Transaction";
import { Transaction } from "../../Entities/Transaction";
import { resolveModuleName } from "typescript";
import { getManager } from "typeorm";
import { LevelType } from "../TypeDefs/Level";
import { Level } from "../../Entities/Level";

export const GET_COMMISSION_RATE = {
  type: LevelType,
  args: {
    classification: { type: GraphQLID},
  },
  async resolve(parent: any, args: any) {
    const { classification } = args;
    const rate = await Level.findOne({classification: classification});
    return rate;
  },
};