import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";

export const useRotateAnimation = (running = true, rate = 300) => {
  //Example of making an infinite looping animation and controlling it with a boolean
  //Note that this assumes the "rate" is constant -- if you wanted to change the rate value after creation the implementation would have to change a bit

  //Only create the animated value once
  const val = useRef(new Animated.Value(0))

  //Store a reference to the animation since we're starting-stopping an infinite loop instead of starting new animations and we aren't changing any animation values after creation. We only want to create the animation object once.
  const anim = useRef(
      Animated.loop(
          Animated.timing(val.current, {
            toValue: 1,
            duration: rate,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          })
      )
  ).current

  //Interpolate the value(s) to whatever is appropriate for your case
  const interpolatedY = val.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5 , 0],
  })
  const interpolatedRotate = val.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6 , 0.8 , 1],
    outputRange: ["0deg", "-0.2deg", "-0.4deg" ,"0.4deg", "0.2deg", "0deg"],
  })

  //Start and stop the animation based on the value of the boolean prop
  useEffect(() => {
    if (running) {
      anim.start()
    } else {
      //When stopping reset the value to 0 so animated item doesn't stop in a random position
      anim.stop()
      val.current.setValue(0)
    }

    //Return a function from useEffect to stop the animation on unmount
    return () => anim.stop()
    //This useEffect should rerun if "running" or "anim" changes (but anim won't change since its a ref we never modify)
  }, [running, anim])

  //Return the animated values. Use "as const" const assertion to narrow the output type to exactly the two values being returned.
  return [interpolatedY, interpolatedRotate]
}