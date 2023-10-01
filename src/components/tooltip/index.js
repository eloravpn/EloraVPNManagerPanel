import TooltipMD from '@mui/material/Tooltip';
import { Component, forwardRef } from 'react';

class MyComponent extends Component {
  render() {
    const { innerRef, children, ...props } = this.props;
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={innerRef}>
        {children}
      </div>
    );
  }
}

// Wrap MyComponent to forward the ref as expected by Tooltip
const WrappedMyComponent = forwardRef(function WrappedMyComponent(props, ref) {
  return <MyComponent {...props} innerRef={ref} />;
});

const Tooltip = ({ title, children }) => {
  return (
    <TooltipMD title={title}>
      <WrappedMyComponent>{children}</WrappedMyComponent>
    </TooltipMD>
  );
};

export default Tooltip;
