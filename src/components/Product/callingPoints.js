import { useEffect, useRef, useState } from "react"
import { trC } from "./Location 2"

let skills = [
  "Angular",
  "CSS",
  "Graphic Design",
  "Ember",
  "HTML",
  "Information Architecture",
  "JavaScript",
  "Mechanical Engineering",
  "Meteor",
  "NodeJS",
  "Plumbing",
  "Python",
  "Rails",
  "React",
  "Kitchen Repair",
  "Ruby",
  "UI Design",
  "User Experience",
]

export default function CallingPoints() {
  const [selectedSkill, setSelectedSkill] = useState("")
  const [dropdownSearchValue, setDropdownSearchValue] = useState("")
  const [editMode, setEditMode] = useState(false)
  const dropdownRef = useRef()
  //console.log(trC);

  /**
   * Close the dropdown when clicked outside
   * Refer https://www.codingdeft.com/posts/react-on-click-outside/ for details
   */
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [editMode])

  const skillSelectionHandler = skill => {
    setSelectedSkill(skill)
    setDropdownSearchValue("")
    setEditMode(false)
  }

  const filteredSkills = skills.filter(skill =>
    skill.match(new RegExp(dropdownSearchValue, "i"))
  )

  return (
    <div className="App">
      <h2>Dropdown filtering</h2>

      {editMode ? (
        // display the dropdown when the input us focused
        <div ref={dropdownRef} className="dropdown-wrapper">
          <input
            className="dropdown-input"
            name="dropdown-input"
            autoFocus
            onChange={e => setDropdownSearchValue(e.target.value)}
            value={dropdownSearchValue}
          />
          <div className="dropdown-list">
            <ul>
              {filteredSkills.map(skill => {
                return (
                  <li key={skill} onClick={() => skillSelectionHandler(skill)}>
                    {skill}{" "}
                  </li>
                )
              })}
              {filteredSkills.length === 0 && (
                <li className="no-result">No results found</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <input
          // Grey out the text when "Select Primary skill" input hint is shown
          className={`dropdown-search ${
            !(dropdownSearchValue || selectedSkill) && "default"
          }`}
          onFocus={() => setEditMode(true)}
          // Display the selected skill or "Select Primary skill" input hint
          value={selectedSkill || "Select Primary skill"}
        />
      )}
    </div>
  )
}