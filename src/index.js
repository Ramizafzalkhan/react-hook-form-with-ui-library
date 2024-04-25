import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Input } from "@material-ui/core";
import { Input as AntdInput } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "./styles.css";

const schema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  iceCreamType: z.string().min(2).max(50),
});

const App = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        name="firstName"
        control={control}
        defaultValue=""
        className="materialUIInput"
      />
      {errors.firstName && <span className="error">{errors.firstName.message}</span>}
      
      <label>Last Name</label>
      <Controller
        render={({ field }) => <AntdInput {...field} />}
        name="lastName"
        control={control}
        defaultValue=""
        label='dd'
      />
      {errors.lastName && <span className="error">{errors.lastName.message}</span>}
      
      <label>Ice Cream Preference</label>
      <Controller
        name="iceCreamType"
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" }
            ]}
          />
        )}
        control={control}
        defaultValue=""
      />
      {errors.iceCreamType && <span style={{color:'#fff'}} className="error">{errors.iceCreamType.message}</span>}
      
      <label>Checkbox</label>
      <Controller
        name="Checkbox"
        control={control}
        render={({ field }) => <Checkbox {...field} />}
      />
      
      <input type="submit" />
    </form>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
