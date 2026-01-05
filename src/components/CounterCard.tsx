import React from "react";
import { Button, Card, CardActions, CardContent, Typography, Stack, TextField } from "@mui/material";
import { useCounterStore } from "../store/counterStore";

export type CounterCardProps = {
  title?: string;
};

export default function CounterCard({ title = "Counter" }: CounterCardProps) {
  const count = useCounterStore((s) => s.count);
  const inc = useCounterStore((s) => s.inc);
  const dec = useCounterStore((s) => s.dec);
  const reset = useCounterStore((s) => s.reset);
  const setValue = useCounterStore((s) => s.set);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1" aria-label="counter-value">
            Aktueller Wert: <strong>{count}</strong>
          </Typography>

          <TextField
            label="Direkt setzen"
            type="number"
            value={count}
            onChange={(e) => setValue(Number(e.target.value))}
            inputProps={{ "aria-label": "counter-input" }}
          />
        </Stack>
      </CardContent>

      <CardActions>
        <Button variant="contained" onClick={inc}>
          +1
        </Button>
        <Button variant="outlined" onClick={dec}>
          -1
        </Button>
        <Button variant="text" onClick={reset}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}
