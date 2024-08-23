import { Checkbox } from "@chakra-ui/react"

interface CheckboxGroupProps {
    children: string,
}

const CheckboxGroup = ({ children }: CheckboxGroupProps) => {
    return (
        <div>
            <Checkbox>{children}</Checkbox>
        </div>
    )
}

export default CheckboxGroup
