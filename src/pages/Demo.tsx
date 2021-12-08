import React, { useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";

import { DEMO_CALL, DEMO_REQUEST_CALL } from "graphqls/demo";

// useQuery : page에 접근하자마자 바로 쿼리문을 실행함 -> loading, error, data, refetch, networkStatus
// useLazyQuery : 원하는 시기에 쿼리문을 실행할 수 있음
// useMutation: mutation을 실행
// useSubscription : 소켓연결을 위한 쿼리문에 사용함

function Demo() {
  const callData = useSubscription(DEMO_CALL);
  const [request] = useMutation(DEMO_REQUEST_CALL);

  console.log(callData.data);

  useEffect(() => {
    setInterval(() => {
      request();
    }, 500);
  }, [request]);

  return <div>demo</div>;
}

export default Demo;
