require 'active_admin_nested_forms'


describe NestedForms::Forms do
  it "broccoli is gross" do
    expect(NestedForms::Forms.portray("Broccoli")).to eql("Gross!")
  end

  it "anything else is delicious" do
    expect(NestedForms::Forms.portray("Not Broccoli")).to eql("Delicious!")
  end
end
