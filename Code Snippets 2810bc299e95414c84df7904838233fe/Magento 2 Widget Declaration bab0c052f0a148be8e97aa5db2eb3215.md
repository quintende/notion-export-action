# Magento 2 Widget Declaration

Description: Declaration of a widget
Editor: vscode
Language: XML
Tag: mage:widget

This snippet will generate a full widget config with one widget inside it.
—
Use **mage:widget:simple** for inline widget declaration.

## Code

```jsx
<?xml version="1.0" ?>
<widgets xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Widget:etc/widget.xsd">
	<widget class="Example\Widgets\Block\Widget\ExampleWidget" id="example_widgets_example_widget">
		<label>Example Widget Label</label>
		<description>Description for an the Example Widget</description>
		<parameters>
			<parameter name="name" sort_order="10" visible="true" xsi:type="text">
				<label>name</label>
			</parameter>
		</parameters>
	</widget>
</widgets>
```

## Snippet

### vscode

```jsx
<?xml version="1.0" ?>
<widgets xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Widget:etc/widget.xsd">
	<widget class="${1:class}" id="${2:id}">
		<label>${3:label}</label>
		<description>${4:description}</description>
		<parameters>
			<parameter name="${5:parameter}" sort_order="10" visible="true" xsi:type="text">
				<label>${6:parameter_label}</label>
			</parameter>
		</parameters>
	</widget>
</widgets>
```