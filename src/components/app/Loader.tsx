import React, { useEffect, useState } from "react";
import { Spin, Button, Alert } from "antd";

interface LoaderProps {
  timeout?: number;
  tip?: string;
}

const defaultProps: LoaderProps = {
  tip: "Loading...",
};

const Loader = (props: LoaderProps) => {
  const { timeout, tip } = { ...defaultProps, ...props };
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (timeout) {
      let timer = setTimeout(() => setShow(true), timeout * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  // TODO: Add a button to force reload the page using ipcRenderer

  return show ? (
    <div className="loading">
      <Alert
        message="Seems we got stuck here"
        description="It's taking too long to load the page. Please click the Retry button or the Force Reload option from thee tray. If the problem persists, please contact us at"
        type="error"
      />
      <Button type="primary" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  ) : (
    <div className="loading">
      <Spin tip={tip} />
    </div>
  );
};

export default Loader;
