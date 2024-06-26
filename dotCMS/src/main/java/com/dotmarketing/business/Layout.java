package com.dotmarketing.business;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Layout implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2604223225988451297L;
	private String id = "";
	private String name;
	private String description;
	private int tabOrder;
	private List<String> portletIds;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTabOrder() {
		return tabOrder;
	}
	public void setTabOrder(int tabOrder) {
		this.tabOrder = tabOrder;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getPortletIds() {
		return portletIds==null ? Collections.emptyList() : portletIds;
	}
	public void setPortletIds(List<String> portletIds) {
		this.portletIds = portletIds==null ? Collections.emptyList() : portletIds;
	}

	public Map<String, Object> toMap() {
		Map<String, Object> layoutMap = new HashMap<>();
		layoutMap.put("id", id);
		layoutMap.put("name", name);
		layoutMap.put("description", description);
		layoutMap.put("tabOrder", tabOrder);
		layoutMap.put("portletIds", portletIds);
		return layoutMap;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Layout layout = (Layout) o;
		return id.equals(layout.id) && name.equals(layout.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}
}
