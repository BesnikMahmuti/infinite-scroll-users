import { HtmlElement, TextField, Button, Checkbox } from "cx/widgets";
import { LabelsLeftLayout, Repeater, Text } from "cx/ui";
import { computable, updateArray } from "cx/data";

//import Controller from './Controller';

export default (
    <cx>
        <div>
            <TextField
                value-bind="intro.core.letterCount"
                placeholder="Type here"
            />
            <p>
                <Text
                    value={storeData =>
                        `You typed letter A ${
                            (
                                (storeData.intro.core.letterCount || "").match(
                                    /A/g
                                ) || []
                            ).length
                        } times. `
                    }
                />
            </p>
        </div>
    </cx>
);
