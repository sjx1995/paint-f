/*
 * @Description: event emitter
 * @Author: Sunly
 * @Date: 2023-08-07 07:57:02
 */
import eventEmitter from "events";

enum enumEvent {
  "selectOne" = "selectOne",
  "selectNone" = "selectNone",
}

const ee = new eventEmitter();

export { ee, enumEvent };
