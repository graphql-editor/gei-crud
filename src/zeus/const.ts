/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	ObjectInput:{

	}
}

export const ReturnTypes: Record<string,any> = {
	Object:{
		name:"String",
		content:"String",
		oneToOne:"RelatedObject",
		oneToMany:"RelatedObject"
	},
	Query:{
		objects:"Object",
		oneById:"Object"
	},
	Mutation:{
		create:"String",
		update:"Boolean",
		delete:"Boolean"
	},
	RelatedObject:{
		name:"String"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}