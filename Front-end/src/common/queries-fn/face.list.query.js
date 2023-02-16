import { createQuery } from "@/utils/react-query";

import * as face_list from "@/apis/face.list.api";

export function getAll(params = {}, isLoading = false, options = {}) {
  return createQuery(
    ["finance", params],
    ({ queryKey: [, _params] }) => face_list.getAll(_params),
    {
      enabled: !isLoading,
      ...options,
    }
  );
}
