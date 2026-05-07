export const getAllNotes = (req, res) => {
    res.status(200).send("you have 20 notes")
}

export const createNote = (req, res) => {
    res.status(201).json({ message: `note created succesfully` })
}

export const updateNote = (req, res) => {
    res.status(200).json({ message: `note updated succesfully` })
}

export const deleteNote = (req, res) => {
    res.status(200).json({ message: `note deleted succesfully` })
}