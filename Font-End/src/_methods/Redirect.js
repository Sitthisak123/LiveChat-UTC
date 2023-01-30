import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Redirect(prop) {
    const navigate = useNavigate();
    useEffect(() => {
      navigate(prop.value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return;
  }
  export default Redirect;