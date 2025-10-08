# CMS FRONTEND

## Overview

This project is a React application using **pnpm**, **Shadcn UI / Tailwind CSS**, and **TanStack Query**. It features authentication and permission-based controls. This README answers common questions to help you get started.

---

## Getting Started

**Q: What do I need to run this project?**

- Node.js (v18+)
- pnpm

**Q: How do I install dependencies?**

```bash
pnpm install
```

**Q: How do I start the development server?**

```bash
pnpm dev
```

---

## Configuration

**Q: How do I configure environment variables?**

Create a `.env.local` file with the following content:

```env
VITE_BACKEND_BASE_URL=https://api.example.com
VITE_TESTING=true              # Optional: Enable test mode
VITE_PERMISSION_BASED=false   # Optional: Disable permissions (for local dev)
```

---

## Authentication

**Q: How do I use the `useAuthStore`?**

The `useAuthStore` manages the authentication state.

```javascript
// src/store/useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  setToken: (token) => set({ accessToken: token }),
  clearToken: () => set({ accessToken: null }),
}));

export default useAuthStore;
```

**Usage:**

```javascript
import useAuthStore from "src/store/useAuthStore";

const MyComponent = () => {
  const { accessToken, setToken, clearToken } = useAuthStore();

  return (
    <div>
      {accessToken ? (
        <>
          <p>Logged in!</p>
          <button onClick={clearToken}>Logout</button>
        </>
      ) : (
        <button
          onClick={() =>
            setToken({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              data: {
                userName: data.userName,
                roleName: data.roleName,
                // add others as per your need
              },
            })
          }
        >
          Login
        </button>
      )}
    </div>
  );
};
```

---

## API Integration

**Q: Where do I define API endpoints?**

```javascript
// src/services/endpoints.js
export const endPoint = {
  login: "/api/auth/login",
  users: "/api/users",
};
```

**Q: Where do I create API functions?**

```javascript
// src/services/api.js
import api from "./apiClient";
import { endPoint } from "./endpoints";

export const GetUsersAPI = async () => {
  const { data } = await api.get(endPoint.users);
  return data;
};

export const LoginAPI = async (credentials) => {
  const { data } = await api.post(endPoint.login, credentials);
  return data;
};
```

---

## Creating New Pages

### Public Page

1. Create `src/pages/public/MyPage/index.jsx`:

   ```javascript
   const MyPage = () => <h1>My Public Page</h1>;
   export default MyPage;
   ```

2. Add route to `src/router/routes/publicRoutes.jsx`:

   ```javascript
   import { lazy, Suspense } from "react";
   import routePath from "@/router/routePath";

   const MyPage = lazy(() => import("@/pages/public/MyPage"));

   export const publicRoutes = [
     {
       path: routePath.myPage,
       element: <MyPage />,
     },
   ];
   ```

### Private (Authenticated) Page

1. Create `src/pages/private/MyPrivatePage/index.jsx`:

   ```javascript
   import { withPageAccess } from "@/hoc/withPageAccess";
   import { menuKeys } from "@/utils/constants/menuKeys";

   const MyPrivatePage = () => <h1>My Private Page</h1>;

   export default withPageAccess(MyPrivatePage, menuKeys.MY_PAGE);
   ```

2. Add route to `src/router/routes/privateRoutes.jsx`:

   ```javascript
   import { lazy } from "react";
   import routePath from "@/router/routePath";
   const MyPrivatePage = lazy(() => import("src/pages/private/MyPrivatePage"));

   export const privateRoutes = [
     {
       path: routePath.myPrivatePage,
       element: <MyPrivatePage />,
     },
   ];
   ```

3. Add `MY_PAGE` to `menuKeys.js`:

   ```javascript
   // src/utils/constants/menuKeys.js
   export const menuKeys = {
     DASHBOARD: "dashboard",
     MY_PAGE: "myPage",
   };
   ```

---

## Permission-Based Handling

**Q: How do I use permission-based access?**

Use the `withPageAccess` HOC:

```javascript
import { withPageAccess } from "@/hooks/usePagePermisssions";
import { menuKeys } from "@/utils/constants/menuKeys";

const MyComponent = () => {
  return <h1>Protected Content</h1>;
};

export default withPageAccess(MyComponent, menuKeys.SOME_PAGE);
```

---

## Data Fetching

### `useQuery`

```javascript
import { useQuery } from "@tanstack/react-query";
import { GetUsersAPI } from "@/services/api";

const MyComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["GetUsersAPI"],
    queryFn: GetUsersAPI,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### `useMutation`

```javascript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserAPI } from "@/services/api";

const MyComponent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: UpdateUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GetUsersAPI.name] });
    },
  });

  const handleUpdate = (data) => {
    mutation.mutate(data);
  };

  return (
    <button
      onClick={() => handleUpdate({ id: 1, name: "New Name" })}
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? "Updating..." : "Update"}
    </button>
  );
};
```

---

## Forms with `react-hook-form` and `zod`

**Q: How do I use `react-hook-form` with `zod` validation and custom form fields?**

### Step 1: Create Schema with `zod`

```ts
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});
```

### Step 2: Use it with `react-hook-form`

```tsx
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/formSchema";
import BasicFormField from "@/components/form/BasicFormField";

const MyForm = () => {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <BasicFormField
          name="name"
          label="Name"
          placeholder="John Doe"
          required
        />
        <BasicFormField
          name="email"
          label="Email"
          placeholder="john@example.com"
          required
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default MyForm;
```

## Building the Project

```bash
pnpm build
```

---

## Contributing

Fork the repo, create a new branch, and submit a pull request.
