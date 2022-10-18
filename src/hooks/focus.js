export const useFocus =(state,callback)=>{
    const focus = () => {
        if (state) {
            callback(true);
        }
      };
      const focusLeave = () => {
        if (state) {
            callback(false);
        }
      };
      return [focus,focusLeave]
}