# Components
All components are stored under `app/components` and can be imported upon use.
## List of components available
### Button
```
interface ButtonProps {
    children: string,
    background?: 'blue' | 'brown' | 'error',
    onClick?: () => void,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean
}
```
`background`: default is `'blue'`.
### InputGroup
```
interface InputGroupProps {
    text: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    type?: string,
    isTextArea?: boolean,
}
```
`isTextArea`: default is `false`.
### SelectGroup
```
interface SelectGroupProps {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
}
```
### Navbar
No props
### QuestionRow
Contains an input and a select for creating a question to the members. Used in `"/create-event/*"`.
```
interface QuestionRowProps {
    questionValue: string,
    questionOnChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    selectValue: string,
    selectOnChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
}
```
# Layouts
## HomepageLayout
```
interface HomepageLayoutProps {
    header: string,
    children: JSX.Element,
}
```
`header`: the header of a page.
