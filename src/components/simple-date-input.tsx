import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DatePickerFields } from "./date-picker-fields";

type SimpleDateInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function SimpleDateInput({
  label,
  value,
  onChange,
}: SimpleDateInputProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable style={styles.box} onPress={() => setExpanded((s) => !s)}>
        <Text style={value ? styles.boxText : styles.placeholder}>
          {value || "DD/MM/YYYY"}
        </Text>
      </Pressable>

      {expanded && (
        <DatePickerFields
          label={""}
          value={value}
          onChange={(v) => {
            onChange(v);
            setExpanded(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#444",
  },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  placeholder: {
    color: "#999",
  },
  boxText: {
    color: "#000",
  },
});
