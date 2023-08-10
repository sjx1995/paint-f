/*
 * @Description: event emitter
 * @Author: Sunly
 * @Date: 2023-08-07 07:57:02
 */
import { EventEmitter } from "events";

enum enumEvent {
  "SELECT_ONE",
  "SELECT_NONE",
  "MOVING",
  "SCALING",
  "ROTATING",
}

const ee = new EventEmitter();

export { ee, enumEvent };
