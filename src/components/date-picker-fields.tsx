import { Picker } from "@react-native-picker/picker";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type DatePickerFieldsProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const currentYear = new Date().getFullYear();

const formatDay = (day: string) => day.padStart(2, "0");

const getDaysInMonth = (year: string, month: string) => {
  if (!year || !month) {
    return Array.from({ length: 31 }, (_, index) => String(index + 1));
  }

  const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
  return Array.from({ length: daysInMonth }, (_, index) => String(index + 1));
};

const parseDateValue = (value: string) => {
  const [day = "", month = "", year = ""] = value.split("/");
  return { day, month, year };
};

export function DatePickerFields({
  label,
  value,
  onChange,
}: DatePickerFieldsProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (!value) {
      setDay("");
      setMonth("");
      setYear("");
      return;
    }

    const parsed = parseDateValue(value);
    setDay(parsed.day);
    setMonth(parsed.month);
    setYear(parsed.year);
  }, [value]);

  const availableDays = useMemo(
    () => getDaysInMonth(year, month),
    [year, month],
  );

  useEffect(() => {
    if (day && month && year) {
      const safeDay = formatDay(day);
      onChange(`${safeDay}/${month}/${year}`);
    }
  }, [day, month, year, onChange]);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Year</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={year} onValueChange={setYear}>
              <Picker.Item label="Select year" value="" />
              {Array.from(
                { length: 41 },
                (_, index) => currentYear - index,
              ).map((yearValue) => (
                <Picker.Item
                  key={yearValue}
                  label={String(yearValue)}
                  value={String(yearValue)}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Month</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={month} onValueChange={setMonth}>
              <Picker.Item label="Select month" value="" />
              {months.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Day</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={day} onValueChange={setDay}>
              <Picker.Item label="Select day" value="" />
              {availableDays.map((dayValue) => (
                <Picker.Item key={dayValue} label={dayValue} value={dayValue} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#444",
  },
  row: {
    gap: 10,
  },
  pickerWrapper: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 13,
    marginBottom: 4,
    color: "#666",
    fontWeight: "500",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
});
