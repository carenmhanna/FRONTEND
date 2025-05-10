import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CenteredModal from "./CenteredModal";

interface SearchComponentProps {
  setSelectedOptions: (selected: string[]) => void;
}

const options = ["Clonazepam", "Diazepam", "Levetiracetam", "Valproate"];

const SearchComponent: React.FC<SearchComponentProps> = ({ setSelectedOptions }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptionsLocal] = useState<string[]>([]);

  const toggleSelection = (option: string) => {
    if (selectedOptions.includes(option)) {
      const updatedOptions = selectedOptions.filter((item) => item !== option);
      setSelectedOptionsLocal(updatedOptions);
      setSelectedOptions(updatedOptions); // Update parent state
    } else {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptionsLocal(updatedOptions);
      setSelectedOptions(updatedOptions); // Update parent state
      setModalVisible(true); // Open modal only when adding an option
    }
    setDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedOptionsLocal([]);
    setSelectedOptions([]); // Clear parent state
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownOpen(!isDropdownOpen)}
      >
        <Ionicons name="search-outline" size={18} color="purple" style={styles.icon} />
        <Text style={styles.placeholderText}>
          {selectedOptions.length === 0
            ? "Select medication..."
            : `${selectedOptions.length} medication(s) selected`}
        </Text>

        <View style={styles.endButtons}>
          {selectedOptions.length > 0 && (
            <TouchableOpacity onPress={clearSelection} style={styles.button}>
              <Ionicons name="close-circle-outline" size={20} color="purple" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setDropdownOpen(!isDropdownOpen)} style={styles.button}>
            <Ionicons name="add-circle-outline" size={20} color="purple" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.selectedContainer}>
        {selectedOptions.map((option, index) => (
          <View key={index} style={styles.selectedTag}>
            <Text style={styles.selectedText}>{option}</Text>
            <TouchableOpacity onPress={() => toggleSelection(option)}>
              <Ionicons name="close-outline" size={16} color="purple" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => toggleSelection(option)}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
              {selectedOptions.includes(option) && (
                <Ionicons name="checkmark-outline" size={20} color="purple" />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setDropdownOpen(false)}
          >
            <Ionicons name="close-circle-outline" size={24} color="purple" />
          </TouchableOpacity>
        </View>
      )}

      <CenteredModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2D6FF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#B766DA",
    width: "90%",
  },
  icon: {
    marginRight: 5,
  },
  placeholderText: {
    color: "#B766DA",
    fontSize: 18,
  },
  endButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  button: {
    marginLeft: 10,
  },
  dropdownMenu: {
    backgroundColor: "#F2D6FF",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B766DA",
    paddingVertical: 10,
    width: "90%",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderWidth: 5,
    borderColor: "#f2d1ff",
  },
  dropdownItemText: {
    color: "#B766DA",
    fontSize: 18,
  },
  selectedContainer: {
    width: "90%",
    marginTop: 10,
  },
  selectedTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0b3ff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 5,
  },
  selectedText: {
    color: "#B766DA",
    marginRight: 5,
    fontSize: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});

export default SearchComponent;
