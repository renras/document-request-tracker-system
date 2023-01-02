import { useEffect, useRef } from "react";
import off from "../utils/on";
import on from "../utils/off";
import PropTypes from "prop-types";

const defaultEvents = ["mousedown", "touchstart"];

const useClickAway = (ref, onClickAway, events = defaultEvents) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    const handler = (event) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedCallback.current(event);
    };
    for (const eventName of events) {
      on(document, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;

useClickAway.PropTypes = {
  ref: PropTypes.node,
  onClickAway: PropTypes.func,
  events: PropTypes.array,
};
