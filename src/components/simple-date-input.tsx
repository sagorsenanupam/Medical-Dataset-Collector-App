import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [editValue, setEditValue] = useState(value || "");

  useEffect(() => {
    setEditValue(value || "");
  }, [value]);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable style={styles.box} onPress={() => setExpanded((s) => !s)}>
        <Text style={editValue ? styles.boxText : styles.placeholder}>
          {editValue || "DD/MM/YYYY"}
        </Text>
      </Pressable>

      {expanded && (
        <View>
          <TextInput
            style={styles.input}
            value={editValue}
            onChangeText={setEditValue}
            placeholder="DD/MM/YYYY"
            onBlur={() => {
              // basic pass-through, user may type valid formatted date
              onChange(editValue);
            }}
          />

          <DatePickerFields
            label={""}
            value={editValue}
            onChange={(v) => {
              setEditValue(v);
              onChange(v);
              setExpanded(false);
            }}
          />
          <View style={styles.rowButtons}>
            <Pressable
              style={styles.clearButton}
              onPress={() => {
                setEditValue("");
                onChange("");
                setExpanded(false);
              }}
            >
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>
          </View>
        </View>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearButton: {
    backgroundColor: "#f00",
    padding: 10,
    borderRadius: 5,
  },
  clearText: {
    color: "#fff",
  },
});
