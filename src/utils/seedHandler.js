export default function makeInstance(name, email, hashed, role, ) {
  return ({
    name,
    email,
    password: hashed,
    role,
  })
}